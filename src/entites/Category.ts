import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Sub_Category } from "./Sub_Category";
import { Dua } from "./Dua";

@Entity({ name: "category" })
export class Category extends BaseEntity {
  @PrimaryColumn({
    name: "id",
    type: "integer",
  })
  id!: number;

  @Column({
    name: "cat_id",
    type: "integer",
  })
  cat_id!: number;

  @Column({
    name: "no_of_dua",
    type: "integer",
  })
  no_of_dua!: number;

  @Column({
    name: "cat_name_bn",
    type: "text",
  })
  cat_name_bn!: string;

  @Column({
    name: "cat_name_en",
    type: "text",
  })
  cat_name_en!: string;

  @Column({
    name: "no_of_subcat",
    type: "integer",
  })
  no_of_subcat!: number;

  @Column({
    name: "cat_icon",
    type: "text",
  })
  cat_icon!: string;

  @OneToMany(
    () => Sub_Category,
    (sub_category) => {
      sub_category.cat_id;
    }
  )
  sub_categories!: Sub_Category[];

  @OneToMany(() => Dua, (dua) => dua.cat_id)
  cat_duas!: Dua[];
}
