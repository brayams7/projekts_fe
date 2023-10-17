
import { CodeIcon, FormatAlignCenterIcon, FormatAlignLeftIcon, FormatAlignRightIcon, FormatBoldIcon, FormatH1Icon, FormatH2Icon, FormatImageIcon, FormatItalicIcon, FormatListIcon, FormatListNumberedIcon, FormatQuoteIcon, FormatUnderlinedIcon, LinkIcon, ParagraphIcon, RedoIcon, UndoIcon } from "../../utils/icons/iconsLexicalEditor";

export const eventTypes = {
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  ul: "ul",
  ol: "ol",
  quote: "quote",
  formatCode: "formatCode",
  formatUndo: "formatUndo",
  formatRedo: "formatRedo",
  formatBold: "formatBold",
  formatItalic: "formatItalic",
  formatUnderline: "formatUnderline",
  formatStrike: "formatStrike",
  formatInsertLink: "formatInsertLink",
  formatAlignLeft: "formatAlignLeft",
  formatAlignCenter: "formatAlignCenter",
  formatAlignRight: "formatAlignRight",
  insertImage: "insertImage",
};

const pluginsList = [
  {
    id: 1,
    Icon: ParagraphIcon,
    event: eventTypes.paragraph,
  },
  {
    id: 2,
    Icon: FormatH1Icon,
    event: eventTypes.h1,
  },
  {
    id: 3,
    Icon: FormatH2Icon,
    event: eventTypes.h2,
  },
  {
    id: 4,
    Icon: FormatListIcon,
    event: eventTypes.ul,
  },

  {
    id: 5,
    Icon: FormatListNumberedIcon,
    event: eventTypes.ol,
  },
  {
    id: 6,
    Icon: FormatQuoteIcon,
    event: eventTypes.quote,
  },

  {
    id: 7,
    Icon: CodeIcon,
    event: eventTypes.formatCode,
  },
  {
    id: 8,
    Icon: UndoIcon,
    event: eventTypes.formatUndo,
  },
  {
    id: 9,
    Icon: RedoIcon,
    event: eventTypes.formatRedo,
  },
  {
    id: 10,
    Icon: FormatBoldIcon,
    event: eventTypes.formatBold,
  },
  {
    id: 11,
    Icon: FormatItalicIcon,
    event: eventTypes.formatItalic,
  },
  {
    id: 12,
    Icon: FormatUnderlinedIcon,
    event: eventTypes.formatUnderline,
  },
  // { // reactive it if you need it
  //   id: 13,
  //   Icon: StrikethroughSOutlinedIcon,
  //   event: eventTypes.formatStrike,
  // },
  {
    id: 13,
    Icon: FormatImageIcon,
    event: eventTypes.insertImage,
  },
  {
    id: 14,
    Icon: LinkIcon,
    event: eventTypes.formatInsertLink,
  },
  {
    id: 15,
    Icon: FormatAlignLeftIcon,
    event: eventTypes.formatAlignLeft,
  },

  {
    id: 16,
    Icon: FormatAlignCenterIcon,
    event: eventTypes.formatAlignCenter,
  },
  {
    id: 17,
    Icon: FormatAlignRightIcon,
    event: eventTypes.formatAlignRight,
  },
];

export default pluginsList;
