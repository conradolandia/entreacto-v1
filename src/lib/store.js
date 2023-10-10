import { writable, readable } from 'svelte/store';

export const visibleEntre = writable(false);
export const visibleActo = writable(false);
export const abiertoActo = writable(false);
export const playerOn = writable(false);
export const apiData = writable([]);
export const numVideos = writable(0);
export const projectPreview = writable(null);
//export const URL = readable(`https://entreacto.co/admin`);
export const URL = readable(`https://comercial.entreacto.co/admin`);
//export const URL = readable(`http://entreacto.test`);
