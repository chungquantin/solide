import { WorkspaceType } from '../types';

export const WORKSPACES: WorkspaceType[] = [
  {
    id: 0,
    workspace: 'default-workspace',
    workspaceType: 'ANCHOR',
    files: [
      {
        id: '1',
        fileName: 'example',
        extension: '',
        path: '~/',
        content: [
          {
            id: '1.1',
            fileName: 'main',
            extension: 'rs',
            path: '~/example',
            content: '// Some comment',
          },
        ],
      },
      {
        id: '2',
        fileName: 'packages',
        extension: '',
        path: '~/',
        content: [
          {
            id: '2.1',
            fileName: 'example',
            path: '~/packages',
            extension: '',
            content: [
              {
                id: '2.1.1',
                fileName: 'hello-world',
                path: '~/packages/examples',
                extension: 'rs',
                content: '// Hi',
              },
              {
                id: '2.1.2',
                fileName: 'example',
                path: '~/packages/example',
                extension: '',
                content: [
                  {
                    id: '2.1.2.1',
                    fileName: 'main',
                    extension: 'rs',
                    path: '~/packages/example/',
                    content: '// Some comment',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
