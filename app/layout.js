import "./globals.css";

export const metadata = {
    title: "E-Spam",
    description: "Email Spam Classifier",
    icons: {
        icon: "/logo.png", 
    },
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
