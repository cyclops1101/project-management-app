export default function NoResults({colSpan}: {colSpan: number}) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 dark:text-gray-400 text-xl">
            No results found
          </p>
        </div>
      </td>
    </tr>
  );
}
