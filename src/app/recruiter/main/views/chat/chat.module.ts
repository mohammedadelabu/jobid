import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { ChatBodyComponent } from './chat-body/chat-body.component';
import { ChatChannelComponent } from './chat-channel/chat-channel.component';
import { PinnedMessagesComponent } from './pinned-messages/pinned-messages.component';
import { RecentMessagesComponent } from './recent-messages/recent-messages.component';
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { IndividualChatComponent } from './direct-messages/individual-chat/individual-chat.component';
import { ChatContentComponent } from './chat-body/chat-content/chat-content.component';
import { CollapsedChatComponent } from './chat-body/collapsed-chat/collapsed-chat.component';
import { ExpandedChatComponent } from './chat-body/expanded-chat/expanded-chat.component';
import { CreateChannelComponent } from './chat-channel/create-channel/create-channel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddDirectMessageComponent } from './direct-messages/add-direct-message/add-direct-message.component';
import { AddTeammatesComponent } from './chat-channel/create-channel/add-teammates/add-teammates.component';

@NgModule({
  declarations: [
    ChatComponent,
    ChatSidebarComponent,
    ChatBodyComponent,
    ChatChannelComponent,
    PinnedMessagesComponent,
    RecentMessagesComponent,
    DirectMessagesComponent,
    IndividualChatComponent,
    ChatContentComponent,
    CollapsedChatComponent,
    ExpandedChatComponent,
    CreateChannelComponent,
    AddDirectMessageComponent,
    AddTeammatesComponent,
  ],
  imports: [CommonModule, ChatRoutingModule, SharedModule],
})
export class ChatModule {}
