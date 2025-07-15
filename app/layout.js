import "./globals.css";

export const metadata = {
    title: "E-Spam",
    description: "Email Spam Classifier",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
