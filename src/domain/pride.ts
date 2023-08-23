import moment from 'moment';

export class PrideContent {
  constructor(
    readonly id: PrideContentId,
    readonly content: PrideContentTypeDomain,
  ) { }

  like(userPhotoURL: string) {
    const newContent = new PrideContentTypeDomain(
      this.content.userName,
      this.content.userPhotoURL,
      this.content.title,
      this.content.serviceName,
      this.content.customerName,
      this.content.sentence,
      new PrideContentThumbsUsers([...this.content.thumbsUsers.values, userPhotoURL])
    );
    return new PrideContent(this.id, newContent);
  }
}

export class PrideContentId {
  constructor(readonly value: string) { }
}

export class PrideContentTypeDomain {
  constructor(
    readonly userName: PrideContentUserName,
    readonly userPhotoURL: PrideContentUserPhotoURL,
    readonly title: PrideContentTitle,
    readonly serviceName: PrideContentServiceName,
    readonly customerName: PrideContentCustomerName,
    readonly sentence: PrideContentSentence,
    readonly thumbsUsers: PrideContentThumbsUsers
  ) { }
}

export class PrideContentUserName {
  constructor(readonly value: string) { }
}

export class PrideContentUserPhotoURL {
  constructor(readonly value: string) { }
}

export class PrideContentTitle {
  constructor(readonly value: string) { }
}

export class PrideContentServiceName {
  constructor(readonly value: string) { }
}

export class PrideContentCustomerName {
  constructor(readonly value: string) { }
}

export class PrideContentSentence {
  constructor(readonly value: string) { }
}

export class PrideContentThumbsUsers {
  constructor(readonly values: string[]) { }
}

export class PrideContentCreatedAt {
  constructor(readonly value: moment.Moment) { }
}

export class PrideContentUpdatedAt {
  constructor(readonly value: moment.Moment) { }
}

export class PrideContents {
  constructor(readonly values: PrideContent[]) { }
}
