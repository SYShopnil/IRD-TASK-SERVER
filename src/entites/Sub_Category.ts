import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Category } from "./Category";
import { Dua } from "./Dua";

@Entity({ name: "sub_category" })
export class Sub_Category extends BaseEntity {
  @PrimaryColumn({
    name: "id",
    type: "integer",
  })
  id!: number;

  @Column({
    name: "subcat_id",
    type: "integer",
  })
  subcat_id!: number;

  @Column({
    name: "subcat_name_bn",
    type: "text",
  })
  subcat_name_bn!: string;

  @Column({
    name: "subcat_name_en",
    type: "text",
  })
  subcat_name_en!: string;

  @Column({
    name: "no_of_dua",
    type: "integer",
  })
  cat_name_en!: number;

  @ManyToOne(() => Category, (category) => category.sub_categories)
  @JoinColumn({
    name: "cat_id",
  })
  cat_id!: Category;

  @OneToMany(() => Dua, (dua) => dua.subcat_id)
  subcat_duas!: Dua[];
}
