import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

const { get_container_details, pnct_empty_return } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 3,
    initialInterval: '1 minute',
  },
});
/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  return await greet(name);
}

export async function container_details(container_no: string): Promise<string> {
  return await get_container_details(container_no);
}

export async function pnct_empty_return_workflow(): Promise<string> {
  return await pnct_empty_return();
}