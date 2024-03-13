import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

import { apiManufacture } from '../../models/Manufacture';
import { apiCategory } from '../../models/Category';
import { apiType } from '../../models/Type';
import { apiSize } from '../../models/Size';
import { apiInventory } from '../../models/Inventory';
import { apiItem } from '../../models/Item';

const api = {};

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('apiManufacture', apiManufacture);
		contextBridge.exposeInMainWorld('apiCategory', apiCategory);
		contextBridge.exposeInMainWorld('apiType', apiType);
		contextBridge.exposeInMainWorld('apiSize', apiSize);
		contextBridge.exposeInMainWorld('apiInventory', apiInventory);
		contextBridge.exposeInMainWorld('apiItem', apiItem);
		contextBridge.exposeInMainWorld('api', api);
	} catch (error) {
		console.error(error);
	}
} else {
	window.electron = electronAPI;
	window.api = api;
}
