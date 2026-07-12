import React from "react";

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-sm border border-graphite/10 dark:border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-graphite/[0.03] dark:bg-white/[0.05]">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left font-medium text-graphite dark:text-paper px-4 py-2.5 border-b border-graphite/10 dark:border-white/10"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-graphite/[0.06] dark:border-white/[0.08] last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-slate align-top leading-relaxed">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
