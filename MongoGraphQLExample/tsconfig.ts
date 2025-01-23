// tsconfig.json at root
{
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@users/*": ["packages/users/src/*"],
        "@products/*": ["packages/products/src/*"],
        "@supergraph/*": ["apps/supergraph/src/*"]
      }
    }
  }
  