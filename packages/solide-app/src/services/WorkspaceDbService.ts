import { DATABASE_NAME, WORKSPACES } from '../constants';
import { WorkspaceType } from '../types';

export default class WorkspaceDbService {
  private static __databaseName: string = DATABASE_NAME;
  private static __databaseVersion: number = 1;

  static openDatabaseRequest(): IDBOpenDBRequest {
    const request: IDBOpenDBRequest = window.indexedDB.open(
      this.__databaseName,
      this.__databaseVersion
    );

    return request;
  }

  static async initDefaultWorkspaces() {
    const defaultAnchorWorkspace = await WorkspaceDbService.getWorkspaceById(0);
    if (!defaultAnchorWorkspace) {
      await WorkspaceDbService.setWorkspaces([WORKSPACES[0]]);
    } else {
      await WorkspaceDbService.putWorkspace(WORKSPACES[0].id, WORKSPACES[0]);
    }
    const defaultSolanaWorkspace = await WorkspaceDbService.getWorkspaceById(1);
    if (!defaultSolanaWorkspace) {
      await WorkspaceDbService.setWorkspaces([WORKSPACES[1]]);
    } else {
      await WorkspaceDbService.putWorkspace(WORKSPACES[1].id, WORKSPACES[0]);
    }
  }

  static initDatabase() {
    if (!window.indexedDB) {
      console.log(
        "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
      );
    }
    const request: IDBOpenDBRequest = this.openDatabaseRequest();
    request.onupgradeneeded = event => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      const objStoreNames = Object.keys(db.objectStoreNames).map(
        key => db.objectStoreNames[key as any]
      );
      if (!objStoreNames.includes('workspaces')) {
        const objStore = db.createObjectStore('workspaces', { keyPath: 'id' });

        objStore.createIndex('workspace', 'workspace', { unique: true });
        objStore.createIndex('workspaceType', 'workspaceType', { unique: false });
      }

      console.log('Database created!');
    };
  }

  static async getDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = this.openDatabaseRequest();
      request.onsuccess = event => {
        try {
          const db = (event.target as IDBRequest).result as IDBDatabase;
          resolve(db);
        } catch (error) {
          reject(error);
        }
      };
    });
  }

  static async getWorkspaceById(workspaceId: number): Promise<WorkspaceType> {
    const db = await WorkspaceDbService.getDatabase();
    console.log(db)
    const workspaceObjectStore = db.transaction('workspaces', 'readonly').objectStore('workspaces');
    return new Promise((resolve, reject) => {
      const handleSuccessGetWorkspace = (event: Event) => {
        try {
          const data = (event.target as IDBRequest).result as WorkspaceType;
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      workspaceObjectStore.get(workspaceId).onsuccess = handleSuccessGetWorkspace;
    });
  }

  static async getAllWorkspaces(): Promise<WorkspaceType[]> {
    const db = await WorkspaceDbService.getDatabase();
    const workspaceObjectStore = db.transaction('workspaces', 'readonly').objectStore('workspaces');
    return new Promise((resolve, reject) => {
      const handleSuccessGetAll = (event: Event) => {
        try {
          const data = (event.target as IDBRequest).result as WorkspaceType[];
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      workspaceObjectStore.getAll().onsuccess = handleSuccessGetAll;
    });
  }

  static async setWorkspaces(workspaces: WorkspaceType[]) {
    const db = await WorkspaceDbService.getDatabase();
    const workspaceObjectStore = db
      .transaction('workspaces', 'readwrite')
      .objectStore('workspaces');
    workspaces.forEach(workspace => {
      workspaceObjectStore.add(workspace).onsuccess = _ => {
        console.log('Workspace added to database!');
      };
    });
  }

  static async putWorkspace(workspaceId: number, workspace: WorkspaceType) {
    const db = await WorkspaceDbService.getDatabase();
    const workspaceObjectStore = db
      .transaction('workspaces', 'readwrite')
      .objectStore('workspaces');
    workspaceObjectStore.put({ ...workspace, id: workspaceId });
  }
}
