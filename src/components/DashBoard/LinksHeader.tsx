const LinksHeader = ({totalLinks = 0}: { totalLinks?: number | undefined }) => {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Your Links
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage, edit, copy, or remove your saved links.
                </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="rounded-md bg-gray-200/60 px-2 py-1 dark:bg-gray-800/70">
              {totalLinks} total
            </span>
            </div>
        </div>
    )
}
export default LinksHeader
