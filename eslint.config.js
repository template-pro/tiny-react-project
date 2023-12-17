import antfu from "@antfu/eslint-config";

export default antfu(
  {
    react: true,
  },
  {
    files: ["**/*.tsx", "**/*.jsx"],
    rules: {
      "react/no-unknown-property": [
        "error",
        {
          "ignore": [
            "css"
          ]
        }
      ]
    },
  }
);
