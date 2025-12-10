import { Card } from '../components/ui/card';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <Card className="group p-6 transition-all hover:shadow-medical border-border/50 bg-gradient-card hover:scale-95">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
};

export default FeatureCard;
