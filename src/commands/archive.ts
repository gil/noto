import chalk from 'chalk'
import cli from 'cli-ux'
import axios from 'axios'
import {Readability} from '@mozilla/readability'
import {JSDOM} from 'jsdom'
import slugify from 'slugify'
import untildify from 'untildify'
import format from 'date-fns/format';
import * as fs from 'fs-extra'
import path from 'path'

import Command from '../base'
import {run} from '../command-runner'

export default class Archive extends Command {
  static description = 'archive given URL into a markdown file'

  static args = [
    {
      name: 'url',
      required: true,
      description: 'the url to archive',
    },
  ]

  async run() {
    const {args} = this.parse(Archive)
    const currentVault = this.store.getCurrentVault()
    const vaultDir = this.store.getVaults()[currentVault]

    cli.action.start(chalk.blueBright('Archiving page...'))

    // Load URL content
    this.log(`${chalk.greenBright('URL')}: ${args.url}`)
    const html = await axios.get(args.url)

    // Parse HTML to extract most important content
    const doc = new JSDOM(html.data, {url: args.url})

    // Generate file name from title
    const title = doc.window.document.title.trim()
    const cleanUrlFile = args.url.split('?')[0].split('/').pop().replace(/\.[^.]+$/, '')
    const slug = slugify(title && title.length > 0 ? title : cleanUrlFile, {
      lower: true,
      locale: 'en',
    })
    this.log(`${chalk.greenBright('Title')}: ${title}`)
    this.log(`${chalk.greenBright('Slug')}: ${slug}`)

    // Create directory
    const dest = path.join(untildify(vaultDir), 'archive')
    const mediaDest = path.join(dest, slug)
    await fs.ensureDir(dest)
    await fs.ensureDir(mediaDest)

    // Extract important content
    const reader = new Readability(doc.window.document)
    const content = reader.parse().content

    // Convert HTML content to markdown
    const cmd = `
      pandoc \
        --from html-native_divs-native_spans \
        --to markdown-grid_tables \
        --wrap=none \
        --extract-media "${slug}" \
        -o "${slug}.md"
`

    await run(this, cmd, {cwd: dest}, content)

    // Delete media folder, if empty
    try {
      await fs.rmdir(mediaDest)
    } catch (error) { /* not empty */ }

    // Add YAML metadata
    const markdownPath = path.join(dest, `${slug}.md`)
    const markdownContent = await fs.readFile(markdownPath)
    const fullMarkdown = `
---
Title: ${title}
URL: ${args.url}
Archived: ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}
---

${markdownContent}
`
    await fs.writeFile(markdownPath, fullMarkdown.trim())
  }
}
