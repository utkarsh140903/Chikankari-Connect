import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 dark:group-[.toaster]:bg-gray-800 dark:group-[.toaster]:text-gray-100 group-[.toaster]:border-gray-200 dark:group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-600 dark:group-[.toast]:text-gray-300",
          actionButton:
            "group-[.toast]:bg-indigo-600 group-[.toast]:text-white dark:group-[.toast]:bg-indigo-500 dark:group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-700 dark:group-[.toast]:bg-gray-700 dark:group-[.toast]:text-gray-300",
          success: "group-[.toast]:bg-green-50 group-[.toast]:text-green-800 dark:group-[.toast]:bg-green-950/50 dark:group-[.toast]:text-green-200 group-[.toast]:border-green-200 dark:group-[.toast]:border-green-800",
          error: "group-[.toast]:bg-red-50 group-[.toast]:text-red-800 dark:group-[.toast]:bg-red-950/50 dark:group-[.toast]:text-red-200 group-[.toast]:border-red-200 dark:group-[.toast]:border-red-800",
          warning: "group-[.toast]:bg-yellow-50 group-[.toast]:text-yellow-800 dark:group-[.toast]:bg-yellow-950/50 dark:group-[.toast]:text-yellow-200 group-[.toast]:border-yellow-200 dark:group-[.toast]:border-yellow-800",
          info: "group-[.toast]:bg-blue-50 group-[.toast]:text-blue-800 dark:group-[.toast]:bg-blue-950/50 dark:group-[.toast]:text-blue-200 group-[.toast]:border-blue-200 dark:group-[.toast]:border-blue-800",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
