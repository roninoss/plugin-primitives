declare module "xcode" {
  interface XcodeProject {
    parseSync(): void;
    hash: any;
  }

  const project: {
    project(file: string): XcodeProject;
  };

  export default project;
}
