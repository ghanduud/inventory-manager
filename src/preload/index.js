import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

import { apiManufacture } from '../main/models/Manufacture';
import { apiCategory } from '../main/models/Category';
import { apiType } from '../main/models/Type';
import { apiSize } from '../main/models/Size';
import { apiInventory } from '../main/models/Inventory';
import { apiMaterial } from '../main/models/Material';
import { apiItem } from '../main/models/Item';

const api = {};

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('apiManufacture', apiManufacture);
		contextBridge.exposeInMainWorld('apiCategory', apiCategory);
		contextBridge.exposeInMainWorld('apiType', apiType);
		contextBridge.exposeInMainWorld('apiSize', apiSize);
		contextBridge.exposeInMainWorld('apiInventory', apiInventory);
		contextBridge.exposeInMainWorld('apiMaterial', apiMaterial);
		contextBridge.exposeInMainWorld('apiItem', apiItem);
		contextBridge.exposeInMainWorld('api', api);
	} catch (error) {
		console.error(error);
	}
} else {
	window.electron = electronAPI;
	window.api = api;
}
