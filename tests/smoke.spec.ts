import { test, expect } from '@playwright/test'
import path from 'path'

const fileUrl = 'file://' + path.join(__dirname, '..', 'index.html')

test('landing page renders and controls are present', async ({ page }) => {
  await page.goto(fileUrl)
  await expect(page.getByRole('heading', { name: /stickmotion studio/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /reset scene/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /export png sequence/i })).toBeVisible()
  await expect(page.getByRole('main')).toBeVisible()
})
