import { IntervalTimer } from './timer';
import * as idb from 'idb';
import { IDBPDatabase } from 'idb';

export interface TimerService {
    getAll(): Promise<IntervalTimer[]>;
    save(timer: IntervalTimer): Promise<IntervalTimer>;
    delete(timer: IntervalTimer | number): Promise<void>;
}

const dbName = 'interval-timer';
const dbVersion = 1;
const storeName = 'timers';

class IDBTimerService implements TimerService {
  private db: IDBPDatabase;

  constructor(db: IDBPDatabase) {
    this.db = db;
  }

  getAll(): Promise<IntervalTimer[]> {
    return this.db.getAll(storeName);
  }

  async save(timer: IntervalTimer): Promise<IntervalTimer> {
    if (!timer.id) {
      delete timer.id;
    }
    const key = await this.db.put(storeName, timer);
    return {
      ...timer,
      id: key as number
    };
  }

  delete(timer: IntervalTimer | number): Promise<void> {
    let id: number | undefined;
    if (typeof timer === 'number') {
      id = timer;
    } else {
      id = timer.id;
    }
    if (!id) {
      throw new Error('Invalid timer ID');
    }
    return this.db.delete(storeName, id);
  }
}

let timerService: TimerService;

export async function timerServiceSingleton(): Promise<TimerService> {
  if (!timerService) {
    const db = await idb.openDB(dbName, dbVersion, {
      upgrade(db, _oldVersion, newVersion) {
        if (newVersion === 1) {
          db.createObjectStore(
            storeName,
            {
              keyPath: 'id',
              autoIncrement: true
            }
          );
        }
      },
    });
    timerService = new IDBTimerService(db);
  }
  return timerService;
}
