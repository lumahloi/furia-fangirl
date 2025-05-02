declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
  
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_API_URL: string;
  }
}