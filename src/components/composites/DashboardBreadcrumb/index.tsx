import { useMatches } from "react-router";
import { Fragment } from "react/jsx-runtime";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/Breadcrumb";

type Crumb = {
    id: string;
    crumb: string;
    path: string;
};

type HandleType = Pick<Crumb, "crumb">;

const DashboardBreadcrumb = () => {
    const matches = useMatches();

    const crumbs: Crumb[] = matches
        .filter((match) => Boolean((match.handle as HandleType)?.crumb))
        .map((match) => ({
            id: match.id,
            crumb: (match.handle as HandleType).crumb,
            path: match.pathname,
        }));

    if (crumbs.length === 0) {
        return null;
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {crumbs.map((crumb, index) => (
                    <Fragment key={crumb.id}>
                        <BreadcrumbItem>
                            {index < crumbs.length - 1 ? (
                                <BreadcrumbLink to={crumb.path}>{crumb.crumb}</BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{crumb.crumb}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {index < crumbs.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default DashboardBreadcrumb;
