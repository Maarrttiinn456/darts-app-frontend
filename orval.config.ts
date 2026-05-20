import { defineConfig } from 'orval';

export default defineConfig({
    dartsApi: {
        input: {
            target: 'http://localhost:3000/api-docs.json',
        },
        output: {
            mode: 'tags-split',
            target: 'src/api/generated',
            client: 'react-query',
            override: {
                mutator: {
                    path: 'src/lib/orvalMutator.ts',
                    name: 'orvalMutator',
                },
                query: {
                    useQuery: true,
                    useMutation: true,
                },
            },
        },
    },
});
