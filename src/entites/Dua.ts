import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Sub_Category } from "./Sub_Category";

@Entity({ name: "dua" })
export class Dua extends BaseEntity {
  @PrimaryColumn({
    name: "id",
    type: "integer",
  })
  id!: number;

  @Column({
    name: "dua_id",
    type: "integer",
  })
  dua_id!: number;

  @Column({
    name: "dua_name_bn",
    type: "text",
  })
  dua_name_bn!: string;

  @Column({
    name: "dua_name_en",
    type: "text",
  })
  dua_name_en!: string;

  @Column({
    name: "top_bn",
    type: "text",
  })
  top_bn!: string;

  @Column({
    name: "top_en",
    type: "text",
  })
  top_en!: string;

  @Column({
    name: "dua_arabic",
    type: "text",
  })
  dua_arabic!: string;

  @Column({
    name: "dua_indopak",
    type: "text",
  })
  dua_indopak!: string;

  @Column({
    name: "transliteration_bn",
    type: "text",
  })
  transliteration_bn!: string;

  @Column({
    name: "transliteration_en",
    type: "text",
  })
  transliteration_en!: string;

  @Column({
    name: "clean_arabic",
    type: "text",
  })
  clean_arabic!: string;

  @Column({
    name: "translation_bn",
    type: "text",
  })
  translation_bn!: string;

  @Column({
    name: "translation_en",
    type: "text",
  })
  translation_en!: string;

  @Column({
    name: "bottom_bn",
    type: "text",
  })
  bottom_bn!: string;

  @Column({
    name: "bottom_en",
    type: "text",
  })
  bottom_en!: string;

  @Column({
    name: "refference_bn",
    type: "text",
  })
  refference_bn!: string;

  @Column({
    name: "refference_en",
    type: "text",
  })
  refference_en!: string;

  @Column({
    name: "audio",
    type: "text",
  })
  audio!: string;

  @ManyToOne(() => Category, (category) => category.cat_duas)
  // @JoinColumn({
  //   name: "cat_id",
  // })
  cat_id!: Category;

  @ManyToOne(() => Sub_Category, (sub_category) => sub_category.subcat_duas)
  // @JoinColumn({
  //   name: "subcat_id",
  // })
  subcat_id!: Sub_Category;
}
