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
      title: "Add grade",
      path: "/admin-dashboard/add-grade",
    },
    {
      title: "Add unit",
      path: "/admin-dashboard/add-unit",
    },
    {
      title: "Add vocabulary",
      path: "/admin-dashboard/add-vocabulary",
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
