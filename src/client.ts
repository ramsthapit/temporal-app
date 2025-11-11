import { Connection, Client } from '@temporalio/client';
import { container_details, example } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  // Connect to the default Server location
  const connection = await Connection.connect({ address: 'localhost:7233' });
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const handle = await client.workflow.start(example, {
    taskQueue: 'hello-world',
    // type inference works! args: [name: string]
    args: ['Temporal'],
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); // Hello, Temporal!
}

async function get_container_details(container_no: string): Promise<string> {
  const connection = await Connection.connect({ address: 'localhost:7233' });
  const client = new Client({ connection });
  const handle = await client.workflow.start(container_details, {
    taskQueue: 'hello-world',
    args: [container_no],
    workflowId: 'container-details-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);
  return await handle.result();
}

get_container_details('MSBU7060010').catch((err) => {
  console.error(err);
  process.exit(1);
});
// run().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
