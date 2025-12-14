import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useThesisStore } from "@/lib/store";
import { ThesisCard } from "@/components/thesis/ThesisCard";
import { FileText, Monitor, Code, TrendingUp } from "lucide-react";

export function Dashboard() {
  const { theses } = useThesisStore();

  const totalTheses = theses.length;
  const frontendCount = theses.filter(t => t.category === 'Frontend Development').length;
  const webCount = theses.filter(t => t.category === 'Web Development').length;
  
  // Get recent 3 theses
  const recentTheses = [...theses].sort((a, b) => 
    new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  ).slice(0, 3);

  const stats = [
    { 
      label: "Total Theses", 
      value: totalTheses, 
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100/50"
    },
    { 
      label: "Frontend Dev", 
      value: frontendCount, 
      icon: Monitor,
      color: "text-indigo-600",
      bg: "bg-indigo-100/50"
    },
    { 
      label: "Web Dev", 
      value: webCount, 
      icon: Code,
      color: "text-teal-600",
      bg: "bg-teal-100/50"
    },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of the thesis repository.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-border/60 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${stat.bg}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Recorded in catalog
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold font-heading flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Additions
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentTheses.map((thesis) => (
              <ThesisCard key={thesis.id} thesis={thesis} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
