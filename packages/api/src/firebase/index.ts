import { initializeApp } from 'firebase-admin/app';

const app = initializeApp();

export * from './auth';
export * from './audit';
export * from './integrity';
