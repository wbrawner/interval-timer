import * as idb from 'idb';

const dbName = 'interval-timer';
const dbVersion = 1;
const storeName = 'timers';

/** */
class IDBTimerService {
    /** @private */
    db = undefined;

    constructor(db) {
        this.db = db;
    }

    /** @returns {Promise<IntervalTimer[]>} */
    getAll() {
        return this.db.getAll(storeName);
    }

    /** @param {IntervalTimer} timer
       * @returns {Promise<IntervalTimer>}
       */
    async save(timer) {
        if (!timer.id) {
            delete timer.id;
        }
        const key = await this.db.put(storeName, timer);
        return {
            ...timer,
            id: key
        };
    }

    /** @param {IntervalTimer | number} timer
       * @returns {Promise<void>}
       */
    delete(timer) {
        let id;
        if (typeof timer === 'number') {
            id = timer;
        }
        else {
            id = timer.id;
        }
        if (!id) {
            throw new Error('Invalid timer ID');
        }
        return this.db.delete(storeName, id);
    }
}

let timerService;

/** @returns {Promise<TimerService>} */
export async function timerServiceSingleton() {
    if (!timerService) {
        const db = await idb.openDB(dbName, dbVersion, {
            upgrade(db, _oldVersion, newVersion, _transaction) {
                if (newVersion === 1) {
                    db.createObjectStore(storeName, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                }
            },
        });
        timerService = new IDBTimerService(db);
    }
    return timerService;
}

/** @typedef {Object} TimerService */
