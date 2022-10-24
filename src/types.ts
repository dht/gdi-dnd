export type IDndState = {
    selectedItemId: string;
    movableItemId: string;
    editableItemId: string;
    destinationIndex: number;
    hoverListId: string;
    movableListId: string;
    selectedListId: string;
    destinationListId: string;
    movingBox: IDndBox;
    startPoint: IDndPoint;
    containerPosition: IDndPoint;
    editableNewId: string;
    growMirror: boolean;
};

export type IDndOptions = {};

export type IDndItem = {
    id: string;
    title: string;
    listId: string;
    parentId?: string;
    order: number;
    color?: string;
};

export type IDndList = {
    id: string;
    title: string;
    order: number;
    dataTags?: string[];
};

export type IDndData = {
    items: IDndItems;
    lists: IDndLists;
};

export type IDndItems = Record<string, IDndItem>;
export type IDndLists = Record<string, IDndList>;

export type IDndPoint = {
    x: number;
    y: number;
};

export type IDndBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};
