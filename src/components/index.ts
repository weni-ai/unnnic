import type { Component } from 'vue';
import { unnnicFontSize as fontSize } from './config';
import formElement from './FormElement/FormElement.vue';
import input from './Input/Input.vue';
import inputNext from './InputNext/InputNext.vue';
import inputDatePicker from './InputDatePicker/InputDatePicker.vue';
import button from './Button/Button.vue';
import buttonIcon from './Button/ButtonIcon.vue';
import sidebar from './Sidebar/index.vue';
import sidebarItem from './Sidebar/SidebarItem.vue';
import table from './Table/Table.vue';
import tableRow from './Table/TableRow.vue';
import dropdown from './Dropdown/Dropdown.vue';
import dropdownItem from './Dropdown/DropdownItem.vue';
import avatarIcon from './AvatarIcon/AvatarIcon.vue';
import icon from './Icon.vue';
import iconLoading from './IconLoading/IconLoading.vue';
import toolTip from './ToolTip/ToolTip.vue';
import card from './Card/Card.vue';
import cardSimple from './Card/SimpleCard.vue';
import cardCompany from './Card/CardCompany.vue';
import cardData from './Card/CardData.vue';
import cardImage from './CardImage/CardImage.vue';
// import cardFlow from './CardFlow/CardFlow.vue';
import cardProject from './CardProject/CardProject.vue';
import cardInformation from './CardInformation/CardInformation.vue';
import checkbox from './Checkbox/Checkbox.vue';
import collapse from './Collapse/Collapse.vue';
import radio from './Radio/Radio.vue';
import languageSelect from './Dropdown/LanguageSelect.vue';
import modal from './Modal/Modal.vue';
import modalUpload from './ModalUpload/ModalUpload.vue';
import { callAlert, callModal } from '../utils/call';
import selectSmart from './SelectSmart/SelectSmart.vue';
// import select from './Select/Select.vue';
import selectItem from './Select/SelectItem.vue';
// import selectListItem from './SelectListItem/SelectListItem.vue';
import multiSelect from './MultiSelect/MultiSelect.vue';
import alert from './Alert/Alert.vue';
// import autocomplete from './Input/Autocomplete.vue';
// import autocompleteSelect from './AutocompleteSelect/AutocompleteSelect.vue';
import tag from './Tag/Tag.vue';
import accordion from './Accordion/Accordion.vue';
import indicator from './Indicator/Indicator.vue';
import skeletonLoading from './SkeletonLoading/SkeletonLoading.vue'; // TODO: Unbreak this component
import carousel from './Carousel/Carousel.vue';
import label from './Label/Label.vue';
import tab from './Tab/Tab.vue';
import tabsExpanded from './TabsExpanded/TabsExpanded.vue';
import banner from './Banner/Banner.vue';
import comment from './Comment/Comment.vue';
import datePicker from './DatePicker/DatePicker.vue';
import breadcrumb from './Breadcrumb/Breadcrumb.vue';
import Switch from './Switch/Switch.vue';
import Slider from './Slider/Slider.vue';
import DataArea from './DataArea/DataArea.vue';
import Pagination from './Pagination/Pagination.vue';
import DropArea from './DropArea/DropArea.vue';
import UploadArea from './UploadArea/UploadArea.vue';
import ImportCard from './ImportCard/ImportCard.vue';
import DateFilter from './DateFilter/DateFilter.vue';
import ChatText from './ChatText/ChatText.vue';
import TextArea from './TextArea/TextArea.vue';
import CardNumber from './CardNumber/CardNumber.vue';
import chartRainbow from './ChartRainbow/ChartRainbow.vue';
import chartBar from './ChartBar/ChartBar.vue';
import chartLine from './ChartLine/ChartLine.vue';
import moodRating from './MoodRating/MoodRating.vue';
import starRating from './StarRating/StarRating.vue';
import audioRecorder from './AudioRecorder/AudioRecorder.vue';
import circleProgressBar from './CircleProgressBar/CircleProgressBar.vue';
import progressBar from './ProgressBar/ProgressBar.vue';
import ChatsContact from './ChatsContact/ChatsContact.vue';
import ChatsDashboardTagLive from './ChatsDashboardTagLive/ChatsDashboardTagLive.vue';
import ChatsHeader from './ChatsHeader/ChatsHeader.vue';
import ChatsMessage from './ChatsMessage/ChatsMessage.vue';
import ReplyMessage from './ChatsMessage/ReplyMessage.vue';
import ChatsNavbar from './ChatsNavbar/ChatsNavbar.vue';
import ChatsUserAvatar from './ChatsUserAvatar/ChatsUserAvatar.vue';
import ChartMultiLine from './ChartMultiLine/ChartMultiLine.vue';
import EmojiPicker from './EmojiPicker/EmojiPicker.vue';
import ChartFunnel from './ChartFunnel/ChartFunnel.vue';
import Disclaimer from './Disclaimer/Disclaimer.vue';
import Drawer from './Drawer/Drawer.vue';
import TableNext from './TableNext/TableNext.vue';
import ModalNext from './ModalNext/ModalNext.vue';
import ModalDialog from './ModalDialog/ModalDialog.vue';
import Tour from './Tour/Tour.vue';
import Navigator from './Navigator/index.vue';
import SelectTime from './SelectTime/index.vue';
import DataTable from './DataTable/index.vue';
import Chip from './Chip/Chip.vue';

type VueComponent = Component;

export interface ComponentsMap {
  [key: string]: VueComponent | Function;
}

export const components: ComponentsMap = {
  unnnicFormElement: formElement,
  unnnicInput: input,
  unnnicInputNext: inputNext,
  unnnicInputDatePicker: inputDatePicker,
  unnnicButton: button,
  unnnicButtonIcon: buttonIcon,
  unnnicSidebar: sidebar,
  unnnicSidebarItem: sidebarItem,
  unnnicTable: table,
  unnnicTableRow: tableRow,
  unnnicAvatarIcon: avatarIcon,
  unnnicIcon: icon,
  unnnicIconSvg: icon,
  unnnicIconLoading: iconLoading,
  unnnicDropdown: dropdown,
  unnnicDropdownItem: dropdownItem,
  unnnicToolTip: toolTip,
  unnnicCard: card,
  unnnicSimpleCard: cardSimple,
  unnnicCardCompany: cardCompany,
  unnnicCardData: cardData,
  unnnicCardImage: cardImage,
  // unnnicCardFlow: cardFlow,
  unnnicCardProject: cardProject,
  unnnicCardInformation: cardInformation,
  unnnicCheckbox: checkbox,
  unnnicCollapse: collapse,
  unnnicRadio: radio,
  unnnicLanguageSelect: languageSelect,
  unnnicModal: modal,
  unnnicModalNext: ModalNext,
  unnnicModalDialog: ModalDialog,
  unnnicModalUpload: modalUpload,
  unnnicSelectSmart: selectSmart,
  // unnnicSelect: select,
  unnnicSelectItem: selectItem,
  // unnnicSelectListItem: selectListItem,
  unnnicMultiSelect: multiSelect,
  unnnicAlert: alert,
  unnnicCallAlert: callAlert,
  unnnicCallModal: callModal,
  // unnnicAutocomplete: autocomplete,
  // unnnicAutocompleteSelect: autocompleteSelect,
  unnnicTag: tag,
  unnnicAccordion: accordion,
  unnnicIndicator: indicator,
  unnnicSkeletonLoading: skeletonLoading,
  unnnicCarousel: carousel,
  unnnicLabel: label,
  unnnicTab: tab,
  unnnicTabsExpanded: tabsExpanded,
  unnnicBanner: banner,
  unnnicComment: comment,
  unnnicDatePicker: datePicker,
  unnnicBreadcrumb: breadcrumb,
  unnnicSwitch: Switch,
  unnnicSlider: Slider,
  unnnicDataArea: DataArea,
  unnnicPagination: Pagination,
  unnnicDropArea: DropArea,
  unnnicUploadArea: UploadArea,
  unnnicImportCard: ImportCard,
  unnnicDateFilter: DateFilter,
  unnnicChatText: ChatText,
  unnnicTextArea: TextArea,
  unnnicCardNumber: CardNumber,
  unnnicChartRainbow: chartRainbow,
  unnnicChartBar: chartBar,
  unnnicChartLine: chartLine,
  unnnicMoodRating: moodRating,
  unnnicStarRating: starRating,
  unnnicAudioRecorder: audioRecorder,
  unnnicCircleProgressBar: circleProgressBar,
  unnnicProgressBar: progressBar,
  unnnicChatsContact: ChatsContact,
  unnnicChatsDashboardTagLive: ChatsDashboardTagLive,
  unnnicChatsHeader: ChatsHeader,
  unnnicChatsMessage: ChatsMessage,
  unnnicReplyMessage: ReplyMessage,
  unnnicChatsNavbar: ChatsNavbar,
  unnnicChatsUserAvatar: ChatsUserAvatar,
  unnnicChartMultiLine: ChartMultiLine,
  unnnicEmojiPicker: EmojiPicker,
  unnnicChartFunnel: ChartFunnel,
  unnnicDisclaimer: Disclaimer,
  unnnicDrawer: Drawer,
  unnnicTableNext: TableNext,
  unnnicTour: Tour,
  unnnicNavigator: Navigator,
  unnnicSelectTime: SelectTime,
  unnnicDataTable: DataTable,
  unnnicChip: Chip,
};

export const unnnicFontSize = fontSize;
export const unnnicFormElement = formElement;
export const unnnicInput = input;
export const unnnicInputNext = inputNext;
export const unnnicInputDatePicker = inputDatePicker;
export const unnnicButton = button;
export const unnnicButtonIcon = buttonIcon;
export const unnnicSidebar = sidebar;
export const unnnicSidebarItem = sidebarItem;
export const unnnicTable = table;
export const unnnicTableRow = tableRow;
export const unnnicDropdown = dropdown as VueComponent;
export const unnnicDropdownItem = dropdownItem;
export const unnnicAvatarIcon = avatarIcon;
export const unnnicIcon = icon;
export const unnnicIconSvg = icon;
export const unnnicIconLoading = iconLoading;
export const unnnicToolTip = toolTip;
export const unnnicCard = card;
export const unnnicSimpleCard = cardSimple;
export const unnnicCardCompany = cardCompany;
export const unnnicCardData = cardData;
export const unnnicCardImage = cardImage as VueComponent;
// export const unnnicCardFlow = cardFlow;
export const unnnicCardProject = cardProject as VueComponent;
export const unnnicCardInformation = cardInformation;
export const unnnicCheckbox = checkbox;
export const unnnicCollapse = collapse;
export const unnnicRadio = radio;
export const unnniclanguageSelect = languageSelect as VueComponent;
export const unnnicModal = modal;
export const unnnicModalDialog = ModalDialog;
export const unnnicModalNext = ModalNext;
export const unnnicModalUpload = modalUpload;
export const unnnicSelectSmart = selectSmart as VueComponent;
// export const unnnicSelect = select;
export const unnnicSelectItem = selectItem;
// export const unnnicSelectListItem = selectListItem;
export const unnnicMultiSelect = multiSelect as VueComponent;
export const unnnicAlert = alert;
export const unnnicCallAlert = (props: any) => callAlert(props);
export const unnnicCallModal = (props: any) => callModal(props);
// export const unnnicAutocomplete = autocomplete;
// export const unnnicAutocompleteSelect = autocompleteSelect;
export const unnnicTag = tag;
export const unnnicAccordion = accordion;
export const unnnicIndicator = indicator;
export const unnnicSkeletonLoading = skeletonLoading;
export const unnnicCarousel = carousel;
export const unnnicLabel = label;
export const unnnicTab = tab;
export const unnnicTabsExpanded = tabsExpanded;
export const unnnicBanner = banner;
export const unnnicComment = comment;
export const unnnicDatePicker = datePicker;
export const unnnicBreadcrumb = breadcrumb;
export const unnnicSwitch = Switch;
export const unnnicSlider = Slider;
export const unnnicDataArea = DataArea;
export const unnnicPagination = Pagination;
export const unnnicDropArea = DropArea;
export const unnnicUploadArea = UploadArea;
export const unnnicImportCard = ImportCard;
export const unnnicDateFilter = DateFilter;
export const unnnicChatText = ChatText;
export const unnnicTextArea = TextArea;
export const unnnicCardNumber = CardNumber;
export const unnnicChartRainbow = chartRainbow;
export const unnnicChartBar = chartBar;
export const unnnicChartLine = chartLine;
export const unnnicMoodRating = moodRating;
export const unnnicStarRating = starRating;
export const unnnicAudioRecorder = audioRecorder;
export const unnnicCircleProgressBar = circleProgressBar;
export const unnnicProgressBar = progressBar;
export const unnnicChatsContact = ChatsContact;
export const unnnicChatsDashboardTagLive = ChatsDashboardTagLive;
export const unnnicChatsHeader = ChatsHeader as VueComponent;
export const unnnicChatsMessage = ChatsMessage;
export const unnnicReplyMessage = ReplyMessage;
export const unnnicChatsNavbar = ChatsNavbar;
export const unnnicChatsUserAvatar = ChatsUserAvatar;
export const unnnicChartMultiLine = ChartMultiLine;
export const unnnicEmojiPicker = EmojiPicker;
export const unnnicChartFunnel = ChartFunnel as VueComponent;
export const unnnicDisclaimer = Disclaimer;
export const unnnicDrawer = Drawer;
export const unnnicTableNext = TableNext;
export const unnnicTour = Tour;
export const unnnicNavigator = Navigator;
export const unnnicDataTable = DataTable as VueComponent;
export const unnnicSelectTime = SelectTime as VueComponent;
export const unnnicChip = Chip;

export const UnnnicFontSize = fontSize;
export const UnnnicFormElement = formElement;
export const UnnnicInput = input;
export const UnnnicInputNext = inputNext;
export const UnnnicInputDatePicker = inputDatePicker;
export const UnnnicButton = button;
export const UnnnicButtonIcon = buttonIcon;
export const UnnnicSidebar = sidebar;
export const UnnnicSidebarItem = sidebarItem;
export const UnnnicTable = table;
export const UnnnicTableRow = tableRow;
export const UnnnicDropdown = dropdown as VueComponent;
export const UnnnicDropdownItem = dropdownItem;
export const UnnnicAvatarIcon = avatarIcon;
export const UnnnicIcon = icon;
export const UnnnicIconSvg = icon;
export const UnnnicIconLoading = iconLoading;
export const UnnnicToolTip = toolTip;
export const UnnnicCard = card;
export const UnnnicSimpleCard = cardSimple;
export const UnnnicCardCompany = cardCompany;
export const UnnnicCardData = cardData;
export const UnnnicCardImage = cardImage as VueComponent;
// export const UnnnicCardFlow = cardFlow;
export const UnnnicCardProject = cardProject as VueComponent;
export const UnnnicCardInformation = cardInformation;
export const UnnnicCheckbox = checkbox;
export const UnnnicCollapse = collapse;
export const UnnnicRadio = radio;
export const UnnniclanguageSelect = languageSelect as VueComponent;
export const UnnnicModal = modal;
export const UnnnicModalDialog = ModalDialog;
export const UnnnicModalNext = ModalNext;
export const UnnnicModalUpload = modalUpload;
export const UnnnicSelectSmart = selectSmart as VueComponent;
// export const UnnnicSelect = select;
export const UnnnicSelectItem = selectItem;
// export const UnnnicSelectListItem = selectListItem;
export const UnnnicMultiSelect = multiSelect as VueComponent;
export const UnnnicAlert = alert;
export const UnnnicCallAlert = (props: any) => callAlert(props);
export const UnnnicCallModal = (props: any) => callModal(props);
// export const UnnnicAutocomplete = autocomplete;
// export const UnnnicAutocompleteSelect = autocompleteSelect;
export const UnnnicTag = tag;
export const UnnnicAccordion = accordion;
export const UnnnicIndicator = indicator;
export const UnnnicSkeletonLoading = skeletonLoading;
export const UnnnicCarousel = carousel;
export const UnnnicLabel = label;
export const UnnnicTab = tab;
export const UnnnicTabsExpanded = tabsExpanded;
export const UnnnicBanner = banner;
export const UnnnicComment = comment;
export const UnnnicDatePicker = datePicker;
export const UnnnicBreadcrumb = breadcrumb;
export const UnnnicSwitch = Switch;
export const UnnnicSlider = Slider;
export const UnnnicDataArea = DataArea;
export const UnnnicPagination = Pagination;
export const UnnnicDropArea = DropArea;
export const UnnnicUploadArea = UploadArea;
export const UnnnicImportCard = ImportCard;
export const UnnnicDateFilter = DateFilter;
export const UnnnicChatText = ChatText;
export const UnnnicTextArea = TextArea;
export const UnnnicCardNumber = CardNumber;
export const UnnnicChartRainbow = chartRainbow;
export const UnnnicChartBar = chartBar;
export const UnnnicChartLine = chartLine;
export const UnnnicMoodRating = moodRating;
export const UnnnicStarRating = starRating;
export const UnnnicAudioRecorder = audioRecorder;
export const UnnnicCircleProgressBar = circleProgressBar;
export const UnnnicProgressBar = progressBar;
export const UnnnicChatsContact = ChatsContact;
export const UnnnicChatsDashboardTagLive = ChatsDashboardTagLive;
export const UnnnicChatsHeader = ChatsHeader as VueComponent;
export const UnnnicChatsMessage = ChatsMessage;
export const UnnnicReplyMessage = ReplyMessage;
export const UnnnicChatsNavbar = ChatsNavbar;
export const UnnnicChatsUserAvatar = ChatsUserAvatar;
export const UnnnicChartMultiLine = ChartMultiLine;
export const UnnnicEmojiPicker = EmojiPicker;
export const UnnnicChartFunnel = ChartFunnel as VueComponent;
export const UnnnicDisclaimer = Disclaimer;
export const UnnnicDrawer = Drawer;
export const UnnnicTableNext = TableNext;
export const UnnnicTour = Tour;
export const UnnnicNavigator = Navigator;
export const UnnnicDataTable = DataTable as VueComponent;
export const UnnnicSelectTime = SelectTime as VueComponent;
export const UnnnicChip = Chip;
