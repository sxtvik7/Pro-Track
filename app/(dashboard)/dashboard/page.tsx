// export default function DashboardPage() {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold">Welcome to Pro-Track</h2>
//       <p className="text-muted-foreground">
//         Your trainer dashboard is ready.
//       </p>
//     </div>
//   );
// }

import { getCurrentTrainer } from "@/lib/current-trainer";

export default async function DashboardPage() {
  const trainer = await getCurrentTrainer();

  return (
    <div>
      <h1>Dashboard</h1>

      <pre>
        {JSON.stringify(trainer, null, 2)}
      </pre>
    </div>
  );
}