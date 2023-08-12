import { Links } from "./links";
import { Meta } from "./meta";

export interface Paginate {
    items:any[];
    meta:Meta;
    links:Links;
}
