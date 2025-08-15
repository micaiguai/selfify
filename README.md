# selfify

<p align="center">
  <a href="https://raw.githubusercontent.com/micaiguai/selfify/refs/heads/main/assets/icon.png">
    <img style="width: 240px;" src="https://raw.githubusercontent.com/micaiguai/selfify/refs/heads/main/assets/icon.png">
  </a>
</p>

Make your project as your own.

## How to use
```bash
npx selfify

# pnpm
pnpx selfify
```

## Modifies
### package.json
- name -> foldername
- description -> `${foldername} description`
- author -> git.user.name
...

### README.md
- content -> `${foldername} description`
...
