import type { TestRunHeaderViewModel } from '../model/types';
import type { TestRunHeaderControls } from './types';

export function updateHeaderProgress(
  headerControls: TestRunHeaderControls,
  headerViewModel: TestRunHeaderViewModel,
): void {
  headerControls.progressLabel.textContent = headerViewModel.progressLabel;
  headerControls.progressBar.setAttribute('aria-valuenow', String(headerViewModel.progressPercent));
  headerControls.progressFill.style.width = `${headerViewModel.progressPercent}%`;
}
