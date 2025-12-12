import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs/promises'

const fileUrl = 'file://' + path.join(__dirname, '..', 'index.html')
const screenshotPath = path.join(__dirname, '..', 'screenshots', 'overview.png')

test('landing page renders and controls are present', async ({ page }) => {
  await fs.mkdir(path.dirname(screenshotPath), { recursive: true })
  await page.setViewportSize({ width: 1440, height: 900 })

  await page.goto(fileUrl)
  await expect(page.getByRole('heading', { name: /stickmotion studio/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /reset scene/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /export png sequence/i })).toBeVisible()
  await expect(page.getByRole('main')).toBeVisible()

  await page.waitForTimeout(300)
  await page.screenshot({ path: screenshotPath, fullPage: true })
})
