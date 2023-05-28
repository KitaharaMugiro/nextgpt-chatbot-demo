import { Conversation } from '../../types/chat';
import { FolderInterface } from '../../types/folder';
import {
  OpenAIModelID,
  OpenAIModels,
  fallbackModelID,
} from '../../types/openai';
import { Prompt } from '../../types/prompt';

import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '../app/const';

import { v4 as uuidv4 } from 'uuid';

const defaultModelId =
  (process.env.DEFAULT_MODEL &&
    Object.values(OpenAIModelID).includes(
      process.env.DEFAULT_MODEL as OpenAIModelID,
    ) &&
    (process.env.DEFAULT_MODEL as OpenAIModelID)) ||
  fallbackModelID;

export const initialFolders: FolderInterface[] = [
  {
    id: '1',
    name: '経営・事業企画',
    type: 'chat',
  },
  {
    id: '1',
    name: '経営・事業企画',
    type: 'prompt',
  },
  {
    id: '2',
    name: '生産・物流・購買',
    type: 'chat',
  },
  {
    id: '2',
    name: '生産・物流・購買',
    type: 'prompt',
  },
  {
    id: '3',
    name: '広報・マーケティング',
    type: 'chat',
  },
  {
    id: '3',
    name: '広報・マーケティング',
    type: 'prompt',
  },
  {
    id: '4',
    name: '営業',
    type: 'chat',
  },
  {
    id: '4',
    name: '営業',
    type: 'prompt',
  },
];

export const initialPrompts: Prompt[] = [
  {
    id: uuidv4(),
    name: '経営・事業企画 Prompt 1',
    description: '経営・事業企画 Description 1',
    content:
      '~~を考慮した上で、経営・事業企画を効率良く進めるにはどうしたらよいか？',
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    folderId: '1',
  },
  {
    id: uuidv4(),
    name: '生産・物流・購買 Prompt 1',
    description: '生産・物流・購買 Description 1',
    content: '生産・物流・購買 Content 1',
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    folderId: '2',
  },
  {
    id: uuidv4(),
    name: '広報・マーケティング Prompt 1',
    description: '広報・マーケティング Description 1',
    content: '広報・マーケティング Content 1',
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    folderId: '3',
  },
  {
    id: uuidv4(),
    name: '営業 Prompt 1',
    description: '営業 Description 1',
    content: '営業 Content 1',
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    folderId: '4',
  },
];

export const initialConversations: Conversation[] = [
  {
    id: uuidv4(),
    name: 'Conversation 1',
    messages: [],
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    prompt: initialPrompts.filter((prompt) => prompt.folderId === '1')[0]
      .content,
    temperature: DEFAULT_TEMPERATURE,
    folderId: '1',
  },
  {
    id: uuidv4(),
    name: 'Conversation 2',
    messages: [],
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    prompt: initialPrompts.filter((prompt) => prompt.folderId === '2')[0]
      .content,
    temperature: DEFAULT_TEMPERATURE,
    folderId: '2',
  },
  {
    id: uuidv4(),
    name: 'Conversation 3',
    messages: [],
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    prompt: initialPrompts.filter((prompt) => prompt.folderId === '3')[0]
      .content,
    temperature: DEFAULT_TEMPERATURE,
    folderId: '3',
  },
  {
    id: uuidv4(),
    name: 'リスト作成',
    messages: [],
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    prompt: initialPrompts.filter((prompt) => prompt.folderId === '4')[0]
      .content,
    temperature: DEFAULT_TEMPERATURE,
    folderId: '4',
  },
  {
    id: uuidv4(),
    name: 'アポイントメント',
    messages: [],
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    prompt: initialPrompts.filter((prompt) => prompt.folderId === '4')[0]
      .content,
    temperature: DEFAULT_TEMPERATURE,
    folderId: '4',
  },
  {
    id: uuidv4(),
    name: '営業メール',
    messages: [],
    model: {
      id: OpenAIModels[defaultModelId].id,
      name: OpenAIModels[defaultModelId].name,
      maxLength: OpenAIModels[defaultModelId].maxLength,
      tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
    },
    prompt: initialPrompts.filter((prompt) => prompt.folderId === '4')[0]
      .content,
    temperature: DEFAULT_TEMPERATURE,
    folderId: '4',
  },
];
