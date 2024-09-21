import Link from "next/link";
import styles from "./adminDashboard.module.css";
import MenuItem from "./menuItem/MenuItem";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    {
      title: "Grade",
      path: "/admin-dashboard/add-grade",
    },
    {
      title: "Unit",
      path: "/admin-dashboard/add-unit",
    },
    {
      title: "Vocabulary",
      path: "/admin-dashboard/add-vocabulary",
    },
    {
      title: "Users",
      path: "/admin-dashboard/users",
    },
    {
      title: "Prices",
      path: "/admin-dashboard/prices",
    },
    {
      title: "Activation request",
      path: "/admin-dashboard/activation-request",
    },
  ];
  return (
    <section className={styles.container}>
      <div className={styles.menu}>
        {links.map((link) => (
          <Link href={link.path} key={link.title}>
            <MenuItem link={link} />
          </Link>
        ))}
      </div>
      {children}
    </section>
  );
}
