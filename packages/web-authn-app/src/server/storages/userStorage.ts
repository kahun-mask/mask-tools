import * as LRU from 'lru-cache';
import { User } from '../entities/user';

export const userStorage = new LRU<string, User>({
  maxAge: 60 * 60 * 1000, // cache only 60min
});
