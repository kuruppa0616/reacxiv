import IllustsStore from "./IllustsStore";
import User from './user';
import pixivApi from "@/api/PixivApi";
import { createContext } from "react";

export const RecommendIllustsStore = createContext(new IllustsStore(() => pixivApi.illustRecommended()));
export const FollowIllustsStore = createContext(new IllustsStore(() => pixivApi.illustFollow()));
export const UserStore = createContext(new User());
