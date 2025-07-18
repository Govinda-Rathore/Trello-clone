import { createClient } from "@liveblocks/client";
import {LiveList,LiveObject} from "@liveblocks/core";
import { createRoomContext } from "@liveblocks/react";


const client = createClient({
  authEndpoint: "/api/liveblocks-auth",

  throttle:100,

  resolveUsers: async ({userIds}) => {
    const response = await fetch(`/api/users?ids=` + userIds.join(','));
    return await response.json();
  },
  resolveMentionSuggestions: async ({text}) => {
    const response = await fetch(`/api/users?search=`+text);
    const users = await response.json();
    return users.map((user:UserMeta) => user.id);
  },
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
    columns: LiveList<LiveObject<Column>> ;
    cards: LiveList<LiveObject<Card>> ;
};

type UserMeta = {
  id: string;
  info: {
    name: string;
    email: string;
    image: string;
  },
};


type ThreadMetadata = {
  cardId: string;
};

export const {

      RoomProvider,
      useMyPresence,
      useUpdateMyPresence,
      useStorage,
      useMutation,
      useSelf,
      useThreads,
      useOthers,
      // Other suspense hooks
    // ...

} = createRoomContext<Presence, Storage, UserMeta, ThreadMetadata >
(client
)