import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ServiceButtonProps {
  slug: string;
  title: string;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({ slug, title }) => {
  return (
    <Link href={`/services/${slug}`}>
      <Button className="bg-black text-white hover:bg-gray-900">
        {title}
      </Button>
    </Link>
  );
};

export default ServiceButton;
