export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Finance Manager</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
