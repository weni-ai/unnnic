import Vue from 'vue';
import { unnnicFontSize as fontSize } from './config';
import formElement from './FormElement/FormElement.vue';
import input from './Input/Input.vue';
import inputNext from './InputNext/InputNext.vue';
import inputDatePicker from './InputDatePicker/InputDatePicker.vue';
import button from './Button/Button.vue';
import buttonNext from './ButtonNext/ButtonNext.vue';
import buttonIcon from './Button/ButtonIcon.vue';
import sidebar from './Sidebar/index.vue';
import sidebarItem from './Sidebar/SidebarItem.vue';
import table from './Table/Table.vue';
import tableRow from './Table/TableRow.vue';
import dropdown from './Dropdown/Dropdown.vue';
import dropdownItem from './Dropdown/DropdownItem.vue';
import avatarIcon from './AvatarIcon/AvatarIcon.vue';
import icon from './Icon.vue';
import toolTip from './ToolTip/ToolTip.vue';
import card from './Card/Card.vue';
import cardCompany from './Card/CardCompany.vue';
import cardData from './Card/CardData.vue';
import cardImage from './CardImage/CardImage.vue';
import cardFlow from './CardFlow/CardFlow.vue';
import cardProject from './CardProject/CardProject.vue';
import cardInformation from './CardInformation/CardInformation.vue';
import checkbox from './Checkbox/Checkbox.vue';
import collapse from './Collapse/Collapse.vue';
import radio from './Radio/Radio.vue';
import languageSelect from './Dropdown/LanguageSelect.vue';
import modal from './Modal/Modal.vue';
import modalNext from './ModalNext/ModalNext.vue';
import modalUpload from './ModalUpload/ModalUpload.vue';
import call from '../utils/call';
import selectSmart from './SelectSmart/SelectSmart.vue';
import select from './Select/Select.vue';
import selectItem from './Select/SelectItem.vue';
import selectListItem from './SelectListItem/SelectListItem.vue';
import multiSelect from './MultiSelect/MultiSelect.vue';
import alert from './Alert/Alert.vue';
import autocomplete from './Input/Autocomplete.vue';
import autocompleteSelect from './AutocompleteSelect/AutocompleteSelect.vue';
import tag from './Tag/Tag.vue';
import accordion from './Accordion/Accordion.vue';
import indicator from './Indicator/Indicator.vue';
import skeletonLoading from './SkeletonLoading/SkeletonLoading.vue';
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
import textEditor from './TextEditor/TextEditor.vue';
import moodRating from './MoodRating/MoodRating.vue';
import starRating from './StarRating/StarRating.vue';
import audioRecorder from './AudioRecorder/AudioRecorder.vue';
import circleProgressBar from './CircleProgressBar/CircleProgressBar.vue';
import progressBar from './ProgressBar/ProgressBar.vue';
import ChatsContact from './ChatsContact/ChatsContact.vue';
import ChatsDashboardTagLive from './ChatsDashboardTagLive/ChatsDashboardTagLive.vue';
import ChatsHeader from './ChatsHeader/ChatsHeader.vue';
import ChatsMessage from './ChatsMessage/ChatsMessage.vue';
import ChatsNavbar from './ChatsNavbar/ChatsNavbar.vue';
import ChatsUserAvatar from './ChatsUserAvatar/ChatsUserAvatar.vue';
import ConnectProjectSelector from './ConnectProjectSelector/ConnectProjectSelector.vue';
import ChartMultiLine from './ChartMultiLine/ChartMultiLine.vue';
import Disclaimer from './Disclaimer/Disclaimer.vue';
import Drawer from './Drawer/Drawer.vue';
import TableNext from './TableNext/TableNext.vue';

const components = {
  unnnicFormElement: formElement,
  unnnicInput: input,
  unnnicInputNext: inputNext,
  unnnicInputDatePicker: inputDatePicker,
  unnnicButton: button,
  unnnicButtonNext: buttonNext,
  unnnicButtonIcon: buttonIcon,
  unnnicSidebar: sidebar,
  unnnicSidebarItem: sidebarItem,
  unnnicTable: table,
  unnnicTableRow: tableRow,
  unnnicAvatarIcon: avatarIcon,
  unnnicIcon: icon,
  unnnicIconSvg: icon,
  unnnicDropdown: dropdown,
  unnnicDropdownItem: dropdownItem,
  unnnicToolTip: toolTip,
  unnnicCard: card,
  unnnicCardCompany: cardCompany,
  unnnicCardData: cardData,
  unnnicCardImage: cardImage,
  unnnicCardFlow: cardFlow,
  unnnicCardProject: cardProject,
  unnnicCardInformation: cardInformation,
  unnnicCheckbox: checkbox,
  unnnicCollapse: collapse,
  unnnicRadio: radio,
  unnnicLanguageSelect: languageSelect,
  unnnicModal: modal,
  unnnicModalNext: modalNext,
  unnnicModalUpload: modalUpload,
  unnnicSelectSmart: selectSmart,
  unnnicSelect: select,
  unnnicSelectItem: selectItem,
  unnnicSelectListItem: selectListItem,
  unnnicMultiSelect: multiSelect,
  unnnicAlert: alert,
  unnnicAutocomplete: autocomplete,
  unnnicAutocompleteSelect: autocompleteSelect,
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
  unnnicTextEditor: textEditor,
  unnnicMoodRating: moodRating,
  unnnicStarRating: starRating,
  unnnicAudioRecorder: audioRecorder,
  unnnicCircleProgressBar: circleProgressBar,
  unnnicProgressBar: progressBar,
  unnnicChatsContact: ChatsContact,
  unnnicChatsDashboardTagLive: ChatsDashboardTagLive,
  unnnicChatsHeader: ChatsHeader,
  unnnicChatsMessage: ChatsMessage,
  unnnicChatsNavbar: ChatsNavbar,
  unnnicChatsUserAvatar: ChatsUserAvatar,
  unnnicConnectProjectSelector: ConnectProjectSelector,
  unnnicChartMultiLine: ChartMultiLine,
  unnnicDisclaimer: Disclaimer,
  unnnicDrawer: Drawer,
  unnnicTableNext: TableNext,
};

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name]);
});

export const unnnicFontSize = fontSize;
export const unnnicFormElement = formElement;
export const unnnicInput = input;
export const unnnicInputNext = inputNext;
export const unnnicInputDatePicker = inputDatePicker;
export const unnnicButton = button;
export const unnnicButtonNext = buttonNext;
export const unnnicButtonIcon = buttonIcon;
export const unnnicSidebar = sidebar;
export const unnnicSidebarItem = sidebarItem;
export const unnnicTable = table;
export const unnnicTableRow = tableRow;
export const unnnicDropdown = dropdown;
export const unnnicDropdownItem = dropdownItem;
export const unnnicAvatarIcon = avatarIcon;
export const unnnicIcon = icon;
export const unnnicIconSvg = icon;
export const unnnicToolTip = toolTip;
export const unnnicCard = card;
export const unnnicCardCompany = cardCompany;
export const unnnicCardData = cardData;
export const unnnicCardImage = cardImage;
export const unnnicCardFlow = cardFlow;
export const unnnicCardProject = cardProject;
export const unnnicCardInformation = cardInformation;
export const unnnicCheckbox = checkbox;
export const unnnicCollapse = collapse;
export const unnnicRadio = radio;
export const unnniclanguageSelect = languageSelect;
export const unnnicModal = modal;
export const unnnicModalNext = modalNext;
export const unnnicModalUpload = modalUpload;
export const unnnicSelectSmart = selectSmart;
export const unnnicSelect = select;
export const unnnicSelectItem = selectItem;
export const unnnicSelectListItem = selectListItem;
export const unnnicMultiSelect = multiSelect;
export const unnnicAlert = alert;
export const unnnicCallAlert = call.callAlert;
export const unnnicCallModal = call.callModal;
export const unnnicAutocomplete = autocomplete;
export const unnnicAutocompleteSelect = autocompleteSelect;
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
export const unnnicTextEditor = textEditor;
export const unnnicMoodRating = moodRating;
export const unnnicStarRating = starRating;
export const unnnicAudioRecorder = audioRecorder;
export const unnnicCircleProgressBar = circleProgressBar;
export const unnnicProgressBar = progressBar;
export const unnnicChatsContact = ChatsContact;
export const unnnicChatsDashboardTagLive = ChatsDashboardTagLive;
export const unnnicChatsHeader = ChatsHeader;
export const unnnicChatsMessage = ChatsMessage;
export const unnnicChatsNavbar = ChatsNavbar;
export const unnnicChatsUserAvatar = ChatsUserAvatar;
export const unnnicConnectProjectSelector = ConnectProjectSelector;
export const unnnicChartMultiLine = ChartMultiLine;
export const unnnicDisclaimer = Disclaimer;
export const unnnicDrawer = Drawer;
export const unnnicTableNext = TableNext;
