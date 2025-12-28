import { test, expect } from '@playwright/test'
import path from 'path'

const fileUrl = 'file://' + path.join(__dirname, '..', 'index.html')
test.use({ viewport: { width: 1440, height: 900 }, colorScheme: 'light', reducedMotion: 'reduce' })

test('landing page renders and controls are present', async ({ page }) => {
  await page.goto(fileUrl)
  await page.addStyleTag({ content: '* { transition: none !important; animation: none !important; }' })
  await expect(page.getByRole('heading', { name: /stickmotion studio/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /reset scene/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /export png sequence/i })).toBeVisible()
  await expect(page.getByRole('main')).toBeVisible()

  await page.waitForTimeout(300)
  await expect(page).toHaveScreenshot('overview.png', { fullPage: true })
})
