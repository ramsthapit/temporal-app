import { Connection, Client } from '@temporalio/client';
import { container_details, example, pnct_empty_return_workflow } from './workflows';
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

  // const handle = await client.workflow.start(example, {
  //   taskQueue: 'hello-world',
  //   // type inference works! args: [name: string]
  //   args: ['Temporal'],
  //   // in practice, use a meaningful business ID, like customerId or transactionId
  //   workflowId: 'workflow-' + nanoid(),
  // });
  
  // console.log(`Started workflow ${handle.workflowId}`);
  // // optional: wait for client result
  // console.log(await handle.result()); // Hello, Temporal!


    const handle = await client.workflow.start(container_details, {
      taskQueue: 'hello-world',
      args: ['MSBU7060010'],
      workflowId: 'container-details-' + nanoid(),
    });
    console.log(`Started workflow ${handle.workflowId}`);


    const result = await client.workflow.start(pnct_empty_return_workflow, {
      taskQueue: 'hello-world',
      args: ['MSBU7060010'],
      workflowId: 'pnct-empty-return-' + nanoid(),
    });
    console.log(`Started workflow ${result.workflowId}`);
}


run().catch((err) => {
  console.error(err);
  process.exit(1);
});
