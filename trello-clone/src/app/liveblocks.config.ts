import { createClient } from "@liveblocks/client";
import {LiveList,LiveObject} from "@liveblocks/core";
import { createRoomContext } from "@liveblocks/react";


const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle:100,
});

export type Presence = {
  cardId?:null|string,
  boardId?:null | string,
};
export type Column={
    name:string;
    id:string;
    index:number;
};

export type Card={
    name:string;
    id:string;
    index:number;
    columnId:string;
}

type Storage = {
    columns: LiveList<LiveObject<Column>>;
    cards: LiveList<LiveObject<Card>>;
};

type UserMeta = {
  id: string;
  info: {
    name: string;
    email: string;
    image: string;
  },
}

type RoomEvent = {};

type ThreadMetadata = {
  cardId: string;
};

export const {

      RoomProvider,
      useMyPresence,
      useStorage,
      useMutation,
      useSelf,
      useThreads,
      // Other suspense hooks
    // ...

} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
);