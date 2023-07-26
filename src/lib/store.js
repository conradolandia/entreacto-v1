import { writable } from 'svelte/store';

export const visibleEntre = writable(false);
export const visibleActo = writable(false);
export const abiertoActo = writable(false);
export const proyectoAbierto = writable(false);
export const playerOn = writable(false);
export const apiData = writable([]);
export const numVideos = writable(0);
export const projectPreview = writable(null);
