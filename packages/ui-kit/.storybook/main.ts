import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // 1. Storybook이 컴포넌트 스토리 파일을 찾을 경로를 정의합니다.
  //    (src 폴더 내의 .stories.ts/tsx 파일을 모두 찾습니다.)
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  
  // 2. 사용할 Storybook 애드온을 정의합니다.
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],

  // 3. 사용할 React 프레임워크와 Vite 빌더를 정의합니다.
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  // 4. (선택) Storybook 문서를 위한 설정입니다.
  docs: {
    autodocs: 'tag',
  },

  // 5. 모노레포에서 필요한 Vite 설정 오버라이드
  async viteFinal(config, { configType }) {
    // 💡 Turborepo/Monorepo 환경에서 로컬 패키지를 찾도록 alias를 설정하거나,
    //    vite.config.js에서 설정된 모노레포 설정을 가져와야 할 수 있습니다.
    //    현재는 기본 설정만 포함하고, 필요 시 확장합니다.
    return config;
  },
};

export default config;
