//
//  Logs.m
//  LogTest
//
//  Created by Admin on 12.11.2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Logs.h"

@implementation Logs {
  NSUInteger callsCount;
  NSUInteger lastFixedCount;
}

RCT_EXPORT_MODULE();

- (instancetype)init {
  self = [super init];
  
  if (self) {
    callsCount = 0;
    lastFixedCount = 0;
    
    [NSTimer scheduledTimerWithTimeInterval:1.0f target:self selector:@selector(logCountPerSec) userInfo:nil repeats:YES];
  }
  
  return self;
}

RCT_EXPORT_METHOD(send:(NSString *)log) {
  callsCount = [log length];
  // NSLog(@"Received log %lu", [log length]);
}

- (void)logCountPerSec {
  NSLog(@"Logs per sec: %lu", callsCount - lastFixedCount);
  lastFixedCount = callsCount;
}

@end
